import { seedCategories } from "./seeds/category.seed";
import { seedPocket } from "./seeds/pocket.seed";
import { seedUser } from "./seeds/user.seed";

async function main(){
    await seedCategories();
    await seedUser();
    await seedPocket();
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    }) 