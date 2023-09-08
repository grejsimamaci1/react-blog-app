import styled from 'styled-components';
import { Card, TextField, Button, Container } from '@mui/material';

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const AddPostWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PostCard = styled(Card)`
  width: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const EditButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
`;

export const StyledTextField = styled(TextField)`
  width: 300px;
  margin-bottom: 10px;
  padding: 10px;
  margin-top: 15px;
  border: 1px solid #ccc;
  border-radius: 20px;
  height: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  border: none;
`;

export const StyledButton = styled(Button)`
  width: 200px;
  padding: 15px;
  background-color: #1b3d61;
  color: white;
  margin-top: 40px;
  font-size: 15px;
  border: none;
  border-radius: 60px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  border: none;
`;