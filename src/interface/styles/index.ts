import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

export const ItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Items = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  margin-block: .5rem;

  &:first-of-type {
    margin-top: 1rem;
  }
`;

export const Input = styled.input`
  background-color: #1B1D21;
  border: 1px solid #303030ff;
  height: 1.5rem;
  margin-left: 1rem;
  outline: none;
  color: white;
  font-family: 'Roboto', sans-serif;
  padding: 0 .5rem;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

interface ButtonProps {
  isOn?: boolean;
}

export const Button = styled.button<ButtonProps>`
  margin-block: 1rem;
  width: 100%;
  background-color: ${({isOn}) => isOn ? '#dc2626' : '#22c55e'};
  color: white;
  font-family: 'Roboto', sans-serif;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  padding: .5rem 1rem;
  cursor: pointer;
  transition: all .3s ease;

  &:hover {
    color: ${({isOn}) => isOn ? '#dc2626' : '#22c55e'};
    background-color: white;
  }
`;

interface ResponseProps {
  error: boolean;
}

export const Response = styled.div<ResponseProps>`
  background-color: ${({error}) => error ? '#dc2626' : '#22c55e'};
  width: 100%;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
`;

export const Error = styled.p`
  color: #dc2626;
`