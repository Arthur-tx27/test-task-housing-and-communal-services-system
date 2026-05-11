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

| Команда                          | Описание                              |
| -------------------------------- | ------------------------------------- |
| `npm run dev`                    | Vite dev-server                       |
| `npm run build`                  | Production-сборка (tsc + vite)        |
| `npm run preview`                | Предпросмотр production-сборки        |
| `npm run lint`                   | ESLint (flat config)                  |
| `npm run typecheck`              | TypeScript проверка                   |
| `npm run test`                   | Jest (все тесты)                      |
| `npm run test -- -t "название"`  | Один тест по названию                 |

## Архитектура (Feature-Sliced Design)

```
src/
  app/          # App.tsx, main.tsx, providers, styles
  pages/        # страницы (meters-list)
  widgets/      # составные компоненты (MetersTable)
  features/     # бизнес-фичи (delete-meter, pagination)
  entities/     # MST-модели, типы, API-сервисы (meter, area, root)
  shared/       # API-клиент, константы, утилиты, UI-компоненты
```

Каждый модуль: `ui/`, `model/`, `api/`, `lib/`, `index.ts`. Слой импортирует только нижележащие слои. `shared/` не импортирует другие слои (кроме тестовых утилит).

## Стек

- **React 19** + **TypeScript**
- **MobX** + **mobx-state-tree** + **mobx-react-lite**
- **styled-components**
- **Vite**
- **Jest** + **React Testing Library**

## API-эндпоинты

Базовый URL настраивается через `.env` (переменная `VITE_API_TARGET` для прокси Vite, `VITE_API_BASE_URL` для тестов).

| Метод   | Путь           | Параметры              |
| ------- | -------------- | ---------------------- |
| GET     | `/meters/`     | `limit=20`, `offset`   |
| GET     | `/areas/`      | `id__in=id1,id2,...`   |
| DELETE  | `/meters/:id/` | —                      |

## Структура проекта

```
src/
├── app/
│   ├── providers/           # StoreProvider, storeContext, useRootStore
│   └── styles/              # theme.ts, GlobalStyles.ts, scrollbar.css, styled.d.ts
├── pages/
│   └── meters-list/ui/      # MetersListPage + styles + тесты
├── widgets/
│   └── meters-table/
│       ├── model/           # useMetersTable (хук с бизнес-логикой)
│       └── ui/              # MetersTable (чистый рендер) + styles + тесты
├── features/
│   ├── delete-meter/ui/     # DeleteButton + styles + тесты
│   └── pagination/
│       ├── model/           # usePagination, pagination.utils, types
│       └── ui/              # Pagination (чистый рендер) + styles + тесты
├── entities/
│   ├── area/
│   │   ├── api/             # areasApi (fetchAreasByIds)
│   │   └── model/           # AreaModel, AreasStore, types + тесты
│   ├── meter/
│   │   ├── api/             # metersApi (fetchMeters, deleteMeter)
│   │   ├── lib/             # mapMeterFromDto (DTO → модель)
│   │   └── model/           # MeterModel, MetersStore, types + тесты
│   └── root/model/          # RootStore + тесты
├── shared/
│   ├── api/                 # client.ts (get, del, ApiError) + тесты
│   ├── constants/           # api.ts, meterTypes.ts, pagination.ts, cssClasses.ts
│   ├── lib/
│   │   ├── formatDate.ts
│   │   ├── formatAddress.ts
│   │   └── test/            # fixtures.ts, renderWithProviders.tsx, setup.ts
│   └── ui/                  # Loader, ErrorMessage, EmptyState
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```
