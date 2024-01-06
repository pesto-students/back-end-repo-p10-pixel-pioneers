'use strict';

/**
 * property controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::property.property', ({strapi}) =>({

    async create (ctx) {
       try {
        let resp = await strapi.service("api::property.property").create({
            data:{
                ...ctx.request.body,
           },
           files:{
               ...ctx.request.files
           }
       })
       ctx.body= {
        success: true,
        message:"Property added Successfully"
       }
       } catch (error) {
        console.error(error);
        console.dir(error, {depth:5})
        ctx.body={
            success: false,
            message:"Failed to add Property"
        }
       }
       
       
    },

    async getPropertyListUser(ctx) {
        try {
            
            let userId = ctx.request.params.id;
            let user = await strapi.service('plugin::users-permissions.user').fetch(userId);
            if (user) {
                let properties = await strapi.service('api::property.property').find({filters:{ownedBy:userId}, populate:["images"]})
                return ctx.body = {
                    success: true,
                    data: properties,
                }
            }

            return ctx.send({
                success: false,
                message: "No Such User Found"
            }, 400)
            
        } catch (error) {
          console.error(error);
          ctx.body = {
            success: false,
            message: error.message
          }   
        }
    }
}));
