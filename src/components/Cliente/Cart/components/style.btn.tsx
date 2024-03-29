import styled from "styled-components";

export const StyledBtnQuantity = styled.form`
  display: flex;
  align-items: center;
  width: 80px;
  padding: 3px;
  overflow: hidden;
  border: 1px solid rgb(29, 29, 29);
  border-radius: 4px;

  & button {
    border: none;
    padding: 0;
    width: 12px;
    font-size: 18px;
    color: rgb(5, 133, 218);
    cursor: pointer;
  }

  .andes-form-control {
    width: 74px;
    overflow: 0;
    padding-top: 0;
  }

  .andes-form-control__control input {
    width: 100%;
    border: none;
    text-align: center;
    font-size: 16px;
    outline: none;
  }
  .andes-form-control__control input:active {
    border: none;
  }
`;
