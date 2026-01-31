import Shop from '@/components/module/shop';
import medicineService from '@/service/medicine.service';

import { medicine } from '../../../../types/medicine.type';


const page = async () => {
    const getmedicine = await medicineService.getMedicines();
    console.log(getmedicine)

    
    return (
        <div className="container mx-auto px-4  sm:py-8  md:py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6  ">
                {
                    getmedicine.data?.map((medicine: medicine) => (
                        <Shop medicine={medicine} key={medicine.id}/>
                    ))
                }
            </div>
        </div>
    );
};

export default page;