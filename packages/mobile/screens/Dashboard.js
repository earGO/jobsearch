import React, {useState} from 'react';
import styled from 'styled-components';
import {Button, ButtonGroup} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginStyles = {
	width: 260
};

const Container = styled.View`
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: center;
`;

const MenuButtonContainer = styled.View`
	height: 15%;
	display: flex;
	align-self: flex-start;
	flex-flow: row nowrap;
	justify-content: flex-start;
	padding: 10px;
`;

const DashboardItemsContainer = styled.View`
	height: 70%;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
`;

const FooterContainer = styled.View`
	height: 15%;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
`;

const DashboardButtonGreen = {
	backgroundColor: 'green',
	padding: 10,
	width: 260
};

const DashboardButtonYellow = {
	backgroundColor: 'green',
	padding: 10,
	width: 260,
	margin: 50
};

const buttons = ['Hello', 'World', 'Buttons'];

const Dashboard = ({navigator}) => {
	const [footerSelected, SetFooterSelected] = useState(1);

	const onFooterPress = selectedIndex => {
		SetFooterSelected(selectedIndex);
	};
	return (
		<Container>
			<MenuButtonContainer>
				<Button
					icon={<Icon name={'menu'} size={15} color={'white'} />}
				/>
			</MenuButtonContainer>
			<DashboardItemsContainer>
				<Button
					icon={<Icon name={'add'} size={25} color="white" />}
					title="New Interview"
					buttonStyle={DashboardButtonGreen}
					onPress={() => navigator.push('AddInterview')}
				/>
				<Button
					icon={
						<Icon name={'arrow-forward'} size={25} color="white" />
					}
					title="Continue interview"
					buttonStyle={DashboardButtonYellow}
				/>
			</DashboardItemsContainer>
			<FooterContainer>
				<ButtonGroup
					onPress={() => {}}
					buttons={buttons}
					selectedIndex={footerSelected}
					onPress={onFooterPress}
				/>
			</FooterContainer>
		</Container>
	);
};

export default Dashboard;
