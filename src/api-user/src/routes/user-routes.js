// src/routes/user-routes.js
import { Hono } from 'hono';
import UserModel from '../db/models/UserModel.js';

const userRoutes = new Hono();

userRoutes.get('/user/:id', async (c) => {
    const id = c.req.param('id');
    try {
        const user = await UserModel.query().findById(id);
        if (!user) {
            return c.json({ message: 'User not found' }, 404);
        }
        return c.json(user, 200);
    } catch (error) {
        return c.json({ message: 'Error fetching user', error: error.message }, 500);
    }
});

userRoutes.put('/user/:id', async (c) => {
    const id = c.req.param('id'); // Assurez-vous que c'est bien param et non params ou une autre méthode, selon la doc de Hono
    const body = await c.req.json();

    // Vérification de la présence des champs requis, à l'exception de l'email puisqu'il ne doit pas être modifié
    if (!body.username || !body.bio) {
        return c.json({ message: "Username and bio fields are required and cannot be empty" }, 400);
    }

    try {
        // Vérifier l'unicité du username, sauf pour l'instance actuelle
        const existingUser = await UserModel.query()
            .where('id', '!=', id)
            .andWhere('username', body.username)
            .first();

        if (existingUser) {
            return c.json({ message: "Username already exists" }, 409);
        }

        // Préparer l'objet de mise à jour en excluant l'email
        const updateData = {
            username: body.username,
            bio: body.bio
        };

        // Mise à jour de l'utilisateur, sans toucher à l'email
        const updatedUser = await UserModel.query().patchAndFetchById(id, updateData);
        if (!updatedUser) {
            return c.json({ message: 'User not found' }, 404);
        }
        return c.json(updatedUser, 200);
    } catch (error) {
        return c.json({ message: 'Error updating user', error: error.message }, 500);
    }
});



userRoutes.delete('/user/:id', async (c) => {
    const id = c.req.param('id');

    try {
        const user = await UserModel.query().findById(id);
        if (!user) {
            return c.json({ message: 'User not found' }, 404);
        }
        await UserModel.query().deleteById(id);
        return c.json({ message: 'User deleted successfully' }, 200);
    } catch (error) {
        return c.json({ message: 'Error deleting user', error: error.message }, 500);
    }
});

export default userRoutes;
