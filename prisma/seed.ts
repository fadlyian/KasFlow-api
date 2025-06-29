import { seedCategories } from "./seeds/category.seed";
import { seedUser } from "./seeds/user.seed";

async function main(){
    await seedCategories();
    await seedUser();
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    }) 