# Система учёта счётчиков ЖКХ

Приложение для отображения списка счётчиков горячей и холодной воды. Тестовое задание на позицию Frontend-разработчик.

## Требования

- Node.js >= 18
- npm >= 9

## Установка и запуск

```bash
npm install
npm run dev
```

Открыть [http://localhost:5173](http://localhost:5173) в браузере.

## Команды

| Команда              | Описание                           |
| -------------------- | ---------------------------------- |
| `npm run dev`        | Vite dev-server                    |
| `npm run build`      | Production-сборка (tsc + vite)     |
| `npm run preview`    | Предпросмотр production-сборки     |
| `npm run lint`       | ESLint (flat config)               |
| `npm run typecheck`  | TypeScript проверка                |
| `npm run test`       | Jest (все тесты)                   |
| `npm run test -- -t "название"` | Один тест по названию |

## Архитектура (Feature-Sliced Design)

```
src/
  app/          # App.tsx, main.tsx, providers (StoreProvider), styles
  pages/        # страницы (meters-list)
  widgets/      # составные компоненты (MetersTable)
  features/     # бизнес-фичи (delete-meter, pagination)
  entities/     # MST-модели, типы, API-сервисы (meter, area)
  shared/       # API-клиент, константы, утилиты, UI-компоненты
```

Каждый модуль следует структуре: `ui/`, `model/`, `api/`, `index.ts`. Слой импортирует только нижележащие слои.

## Стек

- **React 19** + **TypeScript**
- **MobX** + **mobx-state-tree** + **mobx-react-lite**
- **styled-components**
- **Vite**
- **Jest** + **React Testing Library**

## API-эндпоинты

Базовый URL настраивается в `.env`

| Метод   | Путь           | Параметры              |
| ------- | -------------- | ---------------------- |
| GET     | `/meters/`     | `limit=20`, `offset`   |
| GET     | `/areas/`      | `id__in=id1,id2,...`   |
| DELETE  | `/meters/:id/` | —                      |

## Структура проекта

```
src/
├── app/
│   ├── providers/         # StoreProvider, storeContext
│   └── styles/            # theme.ts, GlobalStyles.ts, styled.d.ts
├── pages/
│   └── meters-list/       # MetersListPage
├── widgets/
│   └── meters-table/      # MetersTable
├── features/
│   ├── delete-meter/      # DeleteButton
│   └── pagination/        # Pagination
├── entities/
│   ├── area/              # AreaModel, AreasStore, areasApi
│   ├── meter/             # MeterModel, MetersStore, metersApi
│   └── root/              # RootStore
├── shared/
│   ├── api/               # client.ts (get, del, ApiError)
│   ├── lib/               # hooks (useRootStore), test helpers
│   └── ui/                # Loader, ErrorMessage, EmptyState
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```
