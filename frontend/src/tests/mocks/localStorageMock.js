export const LocalStorageMock = {
   store:{},
  clear:()=> {
    store = {};
  },
  getItem:(key) => {
    return store[key] || null;
  },
  setItem:(key, value) => {
    store[key] = String(value);
  },
  removeItem:(key) => {
    delete store[key];
  }
}