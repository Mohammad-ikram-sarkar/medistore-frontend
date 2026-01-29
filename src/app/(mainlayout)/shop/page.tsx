
import Shop from '@/components/module/shop';
import medicineService from '@/service/medicine.service';

import { medicine } from '../../../../types/medicine.type';


const page = async () => {
    const getmedicine = await medicineService.getMedicines();

    
    return (
        <div className='flex justify-center items-center gap-3 h-[100vh] '>
            {
                getmedicine.data?.map((medicine : medicine ) => (
                 <Shop medicine={medicine} key={medicine.id}/>
                ))
            }
           
              
        </div>
    );
};

export default page;