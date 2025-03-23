import { Controller } from "reaperjs";

const {{name}}Controller: Controller = {
    callback: async (request, response) => {
        response.json("hello");
    }
};

export default {{name}}Controller;