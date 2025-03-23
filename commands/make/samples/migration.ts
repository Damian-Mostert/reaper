import { Migration } from "reaperjs";

const {{name}}Migration = Migration("{{name}}",{
    up(blueprint){
        blueprint.id();
    },
    down(blueprint){
        blueprint.dropTable();
    }
});

export default {{name}}Migration;
