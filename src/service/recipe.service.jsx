import API from "./Api"

export const getRecipes = () => API.get('/api/recipes')
export const createRecipe = (data) => API.post('/api/recipes/upload', data)
export const editRecipe = (id, data) => API.put(`/api/recipes/${id}`, data)
export const deleteRecipe = (id) => API.delete(`/api/recipes/${id}`)
export const getRecipesById = (id) => API.get(`/api/recipes/${id}`)
export const popularRecipes = () => API.get('/api/recipes/popular')
export const myRecipes = () => API.get('/api/recipes/myrecipes')
export const toggleLikeRecipe = (id) => API.put(`/api/recipes/${id}/like`)
export const getSavedRecipes = () => API.get('/api/users/saved')
export const saveRecipe = (id) => API.post(`/api/users/save/${id}`)
export const unsavedRecipe = (id) => API.delete(`/api/users/save/${id}`)