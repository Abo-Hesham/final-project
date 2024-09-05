import LoadingButton from '@mui/lab/LoadingButton';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import './comment.css';
import { toast } from 'react-toastify';
import { useSelector  ,useDispatch} from 'react-redux';
import { addComment } from '../../../API/addComment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { renderAction } from '../../../Redux/Slices/RenderingSlice';

const initialValues = {
  content: ''
};

const CommentButton = (props) => {
  const commentValidation = Yup.object({
    content: Yup.string().min(1).max(100).required("Comment can't be empty")
  });
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.Rendering.user);
  const His = useSelector((state) => state.Rendering.HisOfGov);
  const index = useSelector((state) => state.Rendering.index);
  const commented = useSelector((state)=>state.Rendering.commented)
  const formik = useFormik({
    initialValues,
    validationSchema: commentValidation,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      const content = values.content;
      const HisId = His && index !== null ? His[index]._id : null;
      const userId = user ? user._id : null;
      const data = { userId, HisId, content };

      try {
        const response = await addComment(data);
        if (response.status !== 201) {
          toast.error(response.result.message);
        } else {
          toast.success(response.result.message);
          dispatch(renderAction.setCommented(!commented))
          console.log(commented)
          resetForm();  // Reset the form values to initial state
        }
      } catch (error) {
        toast.error('An error occurred while adding the comment');
      } finally {
        setIsLoading(false);
      }
    }
  });

  const { values, handleBlur, handleChange, errors, dirty, isValid, handleSubmit } = formik;

  return (
    <Grid container sx={{ width: '100%' }}>
      <div className='comCon'>
        <TextField
          name='content'
          className='comText'
          multiline
          value={values.content}
          maxRows={4}
          disabled={!user}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={errors.content && dirty ? errors.content : ''}
          error={!!errors.content && dirty}
        />
        <LoadingButton
          className='cBtn'
          size='large'
          startIcon={<ChatBubbleOutlineIcon />}
          loading={loading}
          disabled={!user || !dirty || !isValid}
          loadingPosition='end'
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </div>
    </Grid>
  );
};

export default CommentButton;
