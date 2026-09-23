const { z } = require('zod');

const text = (max) => z.string().trim().min(1).max(max);
const year = () => z.coerce.number().int().min(0).max(150);

const schemas = {
    birthday: z.object({
        name: text(60),
        age: z.coerce.number().int().min(0).max(150),
        from: text(60)
    }),
    anniversary: z.object({
        partner1: text(60),
        partner2: text(60),
        years: year()
    }),
    valentine: z.object({
        yourName: text(60),
        theirName: text(60),
        message: text(1000)
    }),
    christmas: z.object({
        name: text(60),
        from: text(60)
    }),
    newyear: z.object({
        name: text(60),
        year: z.coerce.number().int().min(1900).max(2999),
        from: text(60),
        message: text(1000)
    }),
    studentday: z.object({
        name: text(60),
        from: text(60)
    }),
    independenceday: z.object({
        name: text(60),
        from: text(60)
    }),
    labourday: z.object({
        name: text(60),
        from: text(60)
    }),
    engineerday: z.object({
        name: text(60),
        from: text(60)
    })
};

function validate(type, body) {
    const schema = schemas[type];
    if (!schema) {
        return { success: false, error: 'Unknown celebration type.' };
    }
    const result = schema.safeParse(body);
    if (!result.success) {
        return { success: false, error: result.error.issues.map((i) => i.message).join('; ') };
    }
    return { success: true, data: result.data };
}

module.exports = { validate, TYPES: Object.keys(schemas) };
