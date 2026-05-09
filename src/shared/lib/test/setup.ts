import '@testing-library/jest-dom';
import { configure } from 'mobx';

process.env.SHOWROOM_API_URL = 'http://test-api.example.com';

configure({ enforceActions: 'never' });


