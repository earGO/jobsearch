import React, {useState} from 'react';
import {Text, View, Picker, TextInput} from 'react-native';
import styled from 'styled-components';
import {Button, ButtonGroup, Card} from 'react-native-elements';
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

const TextQuestion = styled.TextInput`
	height: 50px;
	width: 260px;
	border: 1px solid blue;
	border-radius: 4px;
`;

const QuestionContainer = styled.View`
	height: 80px;
	width: 260px;
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-evenly;
`;

const FooterContainer = styled.View`
	height: 15%;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
`;

const buttons = ['Hello', 'World', 'Buttons'];

const MockQuestions = [
	{value: 'question1', type: 'text'},
	{value: 'question2', type: 'select'},
	{value: 'question3', type: 'text'},
	{value: 'question4', type: 'select'}
];

const MockSelections = ['selection1', 'selection2', 'selection3'];

const Interview = ({navigator, company, position}) => {
	const [footerSelected, SetFooterSelected] = useState(1);
	const [mockSelection, SetMockSelection] = useState(MockSelections[0]);
	const [mockInput, setMockInput] = useState('');

	const onFooterPress = selectedIndex => {
		SetFooterSelected(selectedIndex);
	};

	const OnQuestionPickerChange = (itemValue, itemIndex) => {
		SetMockSelection(itemValue);
	};
	return (
		<Container>
			<MenuButtonContainer>
				<Button
					icon={<Icon name={'menu'} size={15} color={'white'} />}
				/>
			</MenuButtonContainer>
			<DashboardItemsContainer>
				{MockQuestions.map(question => {
					switch (question.type) {
						case 'text':
							return (
								<QuestionContainer>
									<Text>{question.value}</Text>
									<TextQuestion
										onChangeText={text =>
											setMockInput(text)
										}
										value={mockInput}
									/>
								</QuestionContainer>
							);
						case 'select':
							console.log();
							return (
								<QuestionContainer>
									<Text>{question.value}</Text>
									<Picker
										selectedValue={mockSelection}
										style={{height: 50, width: 260}}
										onValueChange={OnQuestionPickerChange}
									>
										<Picker.Item
											label={MockSelections[0]}
											value={MockSelections[0]}
										/>
										<Picker.Item
											label={MockSelections[2]}
											value={MockSelections[2]}
										/>
									</Picker>
								</QuestionContainer>
							);
						default:
							return null;
					}
				})}
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

export default Interview;
