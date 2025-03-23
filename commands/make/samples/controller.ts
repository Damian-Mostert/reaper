import { Controller } from "reaperjs";

const {{name}}Controller: Controller = {
    callback: async (request, response) => {
        response.send("hello");
    }
};

export default {{name}}Controller;