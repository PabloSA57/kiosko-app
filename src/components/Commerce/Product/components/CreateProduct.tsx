import React, { useState } from "react";
import Input from "@components/General/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { schemaCreateProduct } from "@utils/yup";
import useCurrentSWR from "@hooks/useCurrentSWR";
import ImageLoader from "@components/General/ImageLoader.tsx/ImageLoader";
import ProducStoreService from "@service/productstore";
import Select from "@components/General/Select/Select";
import { Alert } from "@mui/material";
import useProductStore from "@hooks/useProductStore";
import { WrapperFlex } from "@components/General/Wrapper/Wrapper";

import { StyledWrapperInput } from "@components/General/ItemsForm/ItemsForm";
import Loader from "@components/General/Loader/Loader";
import { BiLoader } from "react-icons/bi";
import { Button } from "@components/General/Button/Button";

const prouctStoreService = new ProducStoreService();

const CreateProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
    reset,
  } = useForm<TCreateProduct>({
    resolver: yupResolver(schemaCreateProduct),
  });

  const { mutate } = useProductStore();
  const { data: categories } = useCurrentSWR("/category");
  console.log("erros", errors);
  console.log(categories);
  const [selectedImage, setSelectedImage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [status, setStatus] = useState<TStatus>("typing");
  const onSubmit: SubmitHandler<TCreateProduct> = async (data) => {
    setStatus("loading");

    const form = new FormData();
    form.append("image", file);
    form.append("name", data.name_product);
    form.append("category_name", data.category_name);
    form.append("unit_measurement", data.unit_measurement);
    try {
      await prouctStoreService.create(form);
      reset();
      setSelectedImage("");
      setStatus("success");

      setTimeout(() => setStatus("typing"), 3000);

      mutate();
    } catch (error) {
      setStatus("error");
      console.log(error, "error");
    }
  };

  return (
    <WrapperFlex
      as="form"
      className="form-cp"
      $gap="0.7rem"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StyledWrapperInput>
        <label>Imagen del producto</label>
        <ImageLoader
          onSaveFile={(file: File) => setFile(file)}
          errors={errors.file}
          setValue={(file: any) => setValue("file", file)}
          clearError={(name: "file") => clearErrors(name)}
          onSelectedImage={(img: string) => setSelectedImage(img)}
          selectedImage={selectedImage}
        />
      </StyledWrapperInput>
      <Input
        type="text"
        label="Nombre del producto"
        name="name_product"
        register={register}
        errors={errors.name_product}
        required
        placeholder="Ej Tomate"
      />

      <WrapperFlex $flexdirection="row" $gap="1rem">
        <WrapperFlex $width="fit-content" $gap=".5rem">
          {categories && categories.length > 0 && (
            <Select
              register={register}
              errors={errors.category_name}
              label="Categoria"
              name="category_name"
              required
              options={categories.map((e, i) => {
                return e.name;
              })}
            />
          )}
        </WrapperFlex>
        <WrapperFlex $width="fit-content" $gap=".5rem">
          <Select
            register={register}
            errors={errors.unit_measurement}
            label="Unidad de medida"
            name="unit_measurement"
            required
            options={["-", "kg", "unit"].map((e) => e)}
          />
        </WrapperFlex>
      </WrapperFlex>

      <Button disabled={status === "loading"} type="submit">
        {status === "loading" ? (
          <Loader size="sm">
            <BiLoader />
          </Loader>
        ) : (
          "Crear"
        )}
      </Button>
      {status === "success" && (
        <Alert severity="success">El producto se creo correctamente</Alert>
      )}
      {status === "error" && (
        <Alert severity="error">Hubo un error al crear el producto</Alert>
      )}
    </WrapperFlex>
  );
};

export default CreateProduct;
