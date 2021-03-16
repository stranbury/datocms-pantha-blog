import {
  taskDataSchema,
  mockupGeneratorTaskSchema,
} from '../validator/printfulSchema';
import { mockupGeneratorData } from '../mock/testData.json';
import Printful from '../lib/printful';

const printfulClient = new Printful('pau14igl-7xfe-7xs5:b8k3-fl7mwfotabjl');
// Mockups
test('Create a mockup generation task ', async () => {
  //
  const MockupTask = await printfulClient.createMockupGeneratorTask(
    mockupGeneratorData.id,
    mockupGeneratorData.taskData,
  );
  console.log(MockupTask);
  const JoiValidation = mockupGeneratorTaskSchema.validate(MockupTask);

  expect(JoiValidation.error).toBe(undefined);
});
