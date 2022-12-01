import { Loading } from 'carbon-components-react';

import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  place-content: center;

  height: 100vh;

  .bx--loading-overlay {
	background-color: white !important;
  }
`;

const PageLoader = () => (
	<Container>
		<Loading />
	</Container>
)

export default PageLoader;
