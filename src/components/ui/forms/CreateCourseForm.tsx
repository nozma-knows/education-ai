import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Box, Grid } from "@mui/material";
import TextField from "@/components/ui/form-fields/TextField";
import Button from "@/components/ui/buttons/Button";

const title = `What would you like to learn about?`;

interface CreateCourseFormProps {
  loading: boolean;
  onSubmit: SubmitHandler<FieldValues>;
}

export default function CreateCourseForm({
  loading,
  onSubmit,
}: CreateCourseFormProps) {
  // React Hook Form variables
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const HandleSubmit = (data: FieldValues) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="flex flex-col max-w-lg sm:max-w-2xl md:max-w-4xl gap-12">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit((data) => HandleSubmit(data))}>
        <Box sx={{ flexGrow: 1 }} className="w-full">
          <Grid container columnSpacing={3}>
            <Grid item xs={12}>
              <TextField
                control={control}
                name="title"
                type="text"
                placeholder="Create a title*"
                required="Title is required."
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                control={control}
                name="description"
                type="text"
                placeholder="Write a description*"
                required="Description is required."
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} className="flex justify-center">
              <Button label="I'm ready to learn!" loading={loading} />
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
}
