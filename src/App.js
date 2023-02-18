import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';


import Home from './panels/Home';
import Persik from './panels/Persik';
import Organization from './panels/Organization';
import School from './panels/School';
const simpleContractAddress = "0xbfff289e6099859c0d0f080ae95aa9045b6afff1";



const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	var accaunts;
	

	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};


	
	const reg = async e => {
		try {
			// Will open the MetaMask UI
			// You should disable this button while the request is pending!
			accaunts = await ethereum.request({ method: 'eth_requestAccounts' });
			console.log(accaunts);
		  } catch (error) {
			console.error(error);
		  }
	};

	const transaction = async e => {
		console.log("tr");
		const transactionParameters = {
			nonce: '0x00', // ignored by MetaMask
			to: simpleContractAddress, // Required except during contract publications.
			from: accaunts[0], // must match user's active address.
			value: '0x00', // Only required to send ether to the recipient from the initiating external account.
			data:
			  '0xe5071b8e0000000000000000000000000000000000000000000000000000000000000000', // Optional, but used for defining smart contract creation and interaction.
			chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
		  };
		  
		  // txHash is a hex string
		  // As with any RPC call, it may throw an error
		  const txHash = await ethereum.request({
			method: 'eth_sendTransaction',
			params: [transactionParameters],
		  });
	};


	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Home id='home' fetchedUser={fetchedUser} 
									go={go} reg={reg} transaction={transaction} />
								<Persik id='persik' go={go} />
								<Organization id='organization' go={go} />
								<School id='school' go={go} />
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
