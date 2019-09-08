import React, {useState} from 'react';
import {Layout, Menu, Icon} from 'antd';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

function LayoutComponent({children, ...props}) {
	const [collapsed, setCollapsed] = useState(false);

	const onCollapse = () => {
		console.log(collapsed);
		setCollapsed(!collapsed);
	};

	return (
		<Layout style={{minHeight: '100vh'}}>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className="logo" />
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
					<Menu.Item key="1">
						<Icon type="dashboard" />
						<span>Dashboard</span>
					</Menu.Item>
					<Menu.Item key="2">
						<Icon type="assignment" />
						<span>Dictionaries</span>
					</Menu.Item>
					<SubMenu
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
					</Menu.Item>
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
