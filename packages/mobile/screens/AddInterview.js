import React, {useState} from 'react';
import {Picker} from 'react-native';
import styled from 'styled-components';
import {Button, ButtonGroup} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

const mockCompanies = ['apple', 'google', 'netflix', 'facebook'];
const mockPositions = ['junior frontend', 'junior backend', 'junior fullstack'];

const AddInterview = ({navigator}) => {
	const [footerSelected, SetFooterSelected] = useState(1);
	const [company, setCompany] = useState('');
	const [position, setPosition] = useState('');

	const onFooterPress = selectedIndex => {
		SetFooterSelected(selectedIndex);
	};

	const OnPickerChange = (itemValue, itemIndex) => {
		setCompany(itemValue);
	};
	const OnPositionPickerChange = (itemValue, itemIndex) => {
		setPosition(itemValue);
	};

	return (
		<Container>
			<MenuButtonContainer>
				<Button
					icon={<Icon name={'menu'} size={15} color={'white'} />}
				/>
			</MenuButtonContainer>
			<DashboardItemsContainer>
				<Picker
					selectedValue={company}
					style={{height: 50, width: 260}}
					onValueChange={OnPickerChange}
					placeholder={'select company'}
				>
					{mockCompanies.map(item => {
						return (
							<Picker.Item label={item} value={item} key={item} />
						);
					})}
				</Picker>
				<Picker
					selectedValue={position}
					style={{height: 50, width: 260}}
					onValueChange={OnPositionPickerChange}
					placeholder={'select position'}
				>
					{mockPositions.map(item => {
						return (
							<Picker.Item label={item} value={item} key={item} />
						);
					})}
				</Picker>
				<Button
					icon={
						<Icon name={'arrow-forward'} size={25} color="white" />
					}
					title="Continue interview"
					buttonStyle={DashboardButtonYellow}
					onPress={() =>
						navigator.push('Interview', {
							company: company,
							position: position
						})
					}
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

export default AddInterview;
