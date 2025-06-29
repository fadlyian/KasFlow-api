import { seedCategories } from "./seeds/category.seed";

async function main(){
    await seedCategories();
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    }) 