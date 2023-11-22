import { validate } from 'class-validator';
import { BaseEntity } from 'typeorm';

export const validateEntity = async (entity: BaseEntity, data: any): Promise<any[]> => {
    Object.assign(entity, data);

    const errors = await validate(entity);
    if (errors.length > 0) {
        return errors.map(err => {
            const message = err.constraints 
                ? Object.values(err.constraints).join(', ').replace(/_/g, ' ')
                : 'Validation error';
            return {
                field: err.property,
                message
            };
        });
    }
    return [];
};