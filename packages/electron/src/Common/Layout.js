import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Layout, Menu, Icon} from 'antd';
import {screens} from '../screens';
import * as navigationActions from '../RouterModule/actions';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

function LayoutComponent({children, ...props}) {
	const [collapsed, setCollapsed] = useState(false);

	const onCollapse = () => {
		setCollapsed(!collapsed);
	};

	const dispatch = useDispatch();

	const changeRoute = newRoute => {
		dispatch(navigationActions.navigationClick('/' + newRoute.keyPath));
	};

	return (
		<Layout style={{minHeight: '100vh'}}>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className="logo" />
				<Menu
					theme="dark"
					defaultSelectedKeys={['1']}
					mode="inline"
					onClick={changeRoute}
				>
					{screens.map(screen => {
						return (
							<Menu.Item key={screen.key} keyPath={screen.path}>
								<Icon type={screen.iconName} />
								<span>{screen.menuName}</span>
							</Menu.Item>
						);
					})}

					{/*					<SubMenu
						key="sub1"
						title={
							<span>
								<Icon type="user" />
								<span>User</span>
							</span>
						}
					>
						<Menu.Item key="3">Tom</Menu.Item>
						<Menu.Item key="4">Bill</Menu.Item>
						<Menu.Item key="5">Alex</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub2"
						title={
							<span>
								<Icon type="team" />
								<span>Team</span>
							</span>
						}
					>
						<Menu.Item key="6">Team 1</Menu.Item>
						<Menu.Item key="8">Team 2</Menu.Item>
					</SubMenu>
					<Menu.Item key="9">
						<Icon type="file" />
						<span>File</span>
					</Menu.Item>*/}
				</Menu>
			</Sider>
			<Layout>
				<Header style={{background: '#fff', padding: 0}} />
				<Content style={{margin: '0 16px'}}>{children}</Content>
				<Footer style={{textAlign: 'center'}}>
					JobSearch App Admin Tools
				</Footer>
			</Layout>
		</Layout>
	);
}

export default LayoutComponent;
