import styled from 'styled-components';
import { Card } from '@mui/material';

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