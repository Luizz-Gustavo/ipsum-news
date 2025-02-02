import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastName, nickname, email, password, roleId, status } = req.body;

        console.log('Received update data:', { 
            id, 
            roleId, 
            currentType: typeof roleId 
        });

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const userToUpdate = await prisma.user.findUnique({ 
            where: { id: Number(id) },
            include: { role: true }
        });
        
        if (!userToUpdate) {
            return res.status(400).json({ error: 'User not found' });
        }

        console.log('Current user role:', userToUpdate.role);

        if (name && (name.length < 3 || name.length > 125)) {
            return res.status(400).json({ error: 'Name must be between 3 and 125 characters' });
        }

        if (lastName && (lastName.length < 3 || lastName.length > 125)) {
            return res.status(400).json({ error: 'Last name must be between 3 and 125 characters' });
        }

        if (nickname && (nickname.length < 3 || nickname.length > 125)) {
            return res.status(400).json({ error: 'Nickname must be between 3 and 125 characters' });
        }

        if (email !== undefined) {
            if (!email || !email.includes('@')) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            if (email.length > 255) {
                return res.status(400).json({ error: 'Email must be less than 255 characters' });
            }

            if (email !== userToUpdate.email) {
                const existingUser = await prisma.user.findUnique({ where: { email } });
                if (existingUser && existingUser.id !== Number(id)) {
                    return res.status(400).json({ error: 'Email already in use' });
                }
            }
        }

        if (nickname && nickname !== userToUpdate.nickname) {
            const isNicknameUnique = await prisma.user.findUnique({ where: { nickname } });
            if (isNicknameUnique && isNicknameUnique.id !== Number(id)) {
                return res.status(400).json({ error: 'Nickname already in use' });
            }
        }

        if (password && (password.length < 6 || password.length > 125)) {
            return res.status(400).json({ error: 'Password must be between 6 and 125 characters' });
        }

        if (roleId !== undefined) {
            const parsedRoleId = Number(roleId);
            console.log('Parsed roleId:', parsedRoleId);
            
            const existingRole = await prisma.role.findFirst({ 
                where: { id: parsedRoleId } 
            });
            
            if (!existingRole) {
                return res.status(400).json({ error: 'Role does not exist' });
            }
            console.log('Found role:', existingRole);
        }
        
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        const updateData = {
            ...(name !== undefined && { name }),
            ...(lastName !== undefined && { lastName }),
            ...(nickname !== undefined && { nickname }),
            ...(email !== undefined && { email }),
            ...(hashedPassword && { password: hashedPassword }),
            ...(roleId !== undefined && { roleId: Number(roleId) }),
            ...(status !== undefined && { status })
        };

        console.log('Final update data:', updateData);

        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: updateData,
            include: {
                role: true
            }
        });

        const { password: _, ...userWithoutPassword } = updatedUser;
        res.status(200).json(userWithoutPassword);

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ 
            error: 'Failed to update user', 
            details: error.message,
            stack: error.stack 
        });
    }
}