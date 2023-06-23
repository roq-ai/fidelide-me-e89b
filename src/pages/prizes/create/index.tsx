import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPrize } from 'apiSdk/prizes';
import { Error } from 'components/error';
import { prizeValidationSchema } from 'validationSchema/prizes';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { RetailerInterface } from 'interfaces/retailer';
import { getRetailers } from 'apiSdk/retailers';
import { PrizeInterface } from 'interfaces/prize';

function PrizeCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PrizeInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPrize(values);
      resetForm();
      router.push('/prizes');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PrizeInterface>({
    initialValues: {
      name: '',
      description: '',
      image: '',
      stickers_required: 0,
      retailer_id: (router.query.retailer_id as string) ?? null,
    },
    validationSchema: prizeValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Prize
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
            {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
          </FormControl>
          <FormControl id="image" mb="4" isInvalid={!!formik.errors?.image}>
            <FormLabel>Image</FormLabel>
            <Input type="text" name="image" value={formik.values?.image} onChange={formik.handleChange} />
            {formik.errors.image && <FormErrorMessage>{formik.errors?.image}</FormErrorMessage>}
          </FormControl>
          <FormControl id="stickers_required" mb="4" isInvalid={!!formik.errors?.stickers_required}>
            <FormLabel>Stickers Required</FormLabel>
            <NumberInput
              name="stickers_required"
              value={formik.values?.stickers_required}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('stickers_required', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.stickers_required && <FormErrorMessage>{formik.errors?.stickers_required}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<RetailerInterface>
            formik={formik}
            name={'retailer_id'}
            label={'Select Retailer'}
            placeholder={'Select Retailer'}
            fetcher={getRetailers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'prize',
  operation: AccessOperationEnum.CREATE,
})(PrizeCreatePage);
