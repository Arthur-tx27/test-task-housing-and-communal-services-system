import '@testing-library/jest-dom';
import { configure } from 'mobx';

process.env.VITE_API_BASE_URL = 'http://test-api.example.com';

configure({ enforceActions: 'never' });


