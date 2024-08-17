
import { Button } from "@/components/ui/button";
import { DialogTrigger , Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { paidFeatures } from "@/lib/constants";

export default function PaidModal({featureRequest, children}:{featureRequest:string, children:React.ReactNode}) {

   
  return (
    <Dialog>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent>
        {featureRequest}
        <div className="w-full h-[1px] bg-fire"></div>
        <div className="flex flex-col ">
             <div className="flex gap-2">
                    <div className="flex grow items-center gap-1">Features</div>
                    <div className="w-[1px] h-full bg-fire"></div>
                    <div className="w-20 p-2 text-center bg-gray-200 rounded-lg">Free</div>
                    <div className="w-[1px] h-full bg-fire"></div>
                    <div className="w-20 p-2 text-center bg-fire bg-opacity-50 rounded-lg text-white">Pro</div>
            </div>
            {paidFeatures.map((feature, index) => (
                <div className="flex gap-2" key={index}>
                    <div className="flex grow items-center gap-1">{feature.feature}</div>
                    <div className="w-[1px] h-full bg-fire"></div>
                    <div className="w-20 p-2 text-center ">{feature.free}</div>
                    <div className="w-[1px] h-full bg-fire"></div>
                    <div className="w-20 p-2 text-center">{feature.paid}</div>
                </div>
            ))}
            <Button className="w-[max-content] self-center mt-4 px-10">Upgrade</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
