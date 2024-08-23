import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

function AccordionFilter({title, categoryes, handleCategoryChange, selectedCategory}) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="category">
        <AccordionTrigger className="text-base">
          <h3 className="text-base font-medium mb-2">{title}</h3>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-2">
            {categoryes.map((category) => (
              <Label
                key={category}
                className="flex items-center gap-2 font-normal"
              >
                <Checkbox
                  checked={selectedCategory.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                {category}
              </Label>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default AccordionFilter;
