export const DISHES_LOADING = 'DISHES_LOADING';
export const DISHES_FAILED = 'DISHES_FAILED';
export const ADD_DISHES = 'ADD_DISHES';

export const THEPLACE_LOADING = 'THEPLACE_LOADING';
export const ADD_THEPLACE = 'ADD_THEPLACE';
export const THEPLACE_FAILED = 'THEPLACE_FAILED';

export const CASING_LOADING = 'CASING_LOADING';
export const ADD_CASING = 'ADD_CASING';
export const CASING_FAILED = 'CASING_FAILED';

export const STAFF_LOADING = 'STAFF_LOADING';
export const ADD_STAFF = 'ADD_STAFF';
export const STAFF_FAILED = 'STAFF_FAILED';

export const CREDENTIALS_LOADING = 'CREDENTIALS_LOADING';
export const ADD_CREDENTIALS = 'ADD_CREDENTIALS';
export const CREDENTIALS_FAILED = 'CREDENTIALS_FAILED';

export const MYCONTENT_LOADING = 'MYCONTENT_LOADING';
export const ADD_MYCONTENT = 'ADD_MYCONTENT';
export const MYCONTENT_FAILED = 'MYCONTENT_FAILED';

export const ACTION_TYPES = 
{
    casing:{"add": "ADD_CASING", "loading": "CASING_LOADING", "failed":"CASING_FAILED"},
    credentials:{"add": "ADD_CREDENTIALS", "loading": "CREDENTIALS_LOADING", "failed":"CREDENTIALS_FAILED"},
    dishes:{"add": "ADD_DISHES", "loading": "DISHES_LOADING", "failed":"DISHES_FAILED"},
    staff:{"add": "ADD_STAFF", "loading": "STAFF_LOADING", "failed":"STAFF_FAILED"},
    thePlace:{"add": "ADD_THEPLACE", "loading": "THEPLACE_LOADING", "failed":"THEPLACE_FAILED"}
}