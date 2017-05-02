import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  padding: 1em;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: ${props => props.grow ? 1 : 0};
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: ${props => props.grow ? 1 : 0};
`
