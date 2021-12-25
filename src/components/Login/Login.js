import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ColorNav } from "../../contexts/ColorNav";
import { Redirect } from "react-router-dom";
import './login.scss';
import Alert from "../Alert/Alert";
const Login = () => {
    const [account, setAccount] = useState({
        username: '',
        password: '',
        isAlert: false,
        items: [
            {
                name: 'A1',
                content: 'Trung ương'
            },
            {
                name: 'A2',
                content: 'Thành phố'
            },
            {
                name: 'A3',
                content: 'Quận huyện'
            },
            {
                name: 'B1',
                content: 'Phường xã'
            },
            {
                name: 'B2',
                content: 'Thôn xóm'
            },

        ]
    });
    const history = useHistory();
    const { color, chooseColor, loginUser, auth } = useContext(ColorNav);
    if (auth.isAuth == true) {
        // console.log(auth);
        return <Redirect to={color.route[color.tab]}></Redirect>
    }
    const changeUsername = (e) => {
        account.username = e.target.value;
        setAccount({ ...account, username: account.username });
    }
    const changePassword = (e) => {
        account.password = e.target.value;
        setAccount({ ...account, password: account.password });
    }
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const result = await loginUser({ ...account, level: color.level });
            console.log(result);
            // if (user.result == 'login success') {
            //     history.push('/dashboard');
            // }
            if (result.result !== 'Login success') {
                setAccount({ ...account, isAlert: true });
                setTimeout(() => setAccount({ ...account, isAlert: false }), 3000);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const chooseLevel = (e) => {
        document.querySelectorAll('.navigation li')
            .forEach(item => {
                item.setAttribute('style',
                    'background-color:#ccc;border-top-left-radius: 0;border-bottom-left-radius: 0;');

            });
        setAccount({ ...account, username: '', password: '', isAlert: false })
        const node = e.target.localName === 'span' ? e.target.parentElement : e.target;

        node.setAttribute('style', `background-color:
        ${color.info[node.className].backgroundColor};border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;`);

        document.querySelector('.border-login')
            .setAttribute('style', `background-color:${color.info[node.className].backgroundColor}`);
        chooseColor(node.className);
    }

    return (
        <div className="main">
            <div className="border-nav">
                <div className="x">
                    <ul className="navigation">
                        {
                            account.items.map((item, index) => {
                                return (<li key={index}
                                    className={item.name}
                                    onClick={(e) => chooseLevel(e)}
                                    style={item.name == color.level ?
                                        {
                                            'background': `${color.info[color.level].backgroundColor}`,
                                            'border-top-left-radius': '10px',
                                            'border-bottom-left-radius': '10px'
                                        }
                                        : {}
                                    }
                                >
                                    <span>{item.content}</span>
                                </li>)
                            })
                        }
                    </ul>
                    <div className="border-login"
                        style={{
                            'background': `${color.info[color.level].backgroundColor}`
                        }}
                    >
                        <div className="title">Citizen manager</div>
                        <Alert isAlert={account.isAlert} />
                        <div>
                            <label>Tên đăng nhập:</label>
                            <input type="text"
                                required
                                name="username"
                                onChange={changeUsername}
                                value={account.username}
                                placeholder={color.level == 'A1' ?
                                    `Nhập tối đa ${color.info[color.level].length} ký tự`
                                    : `Nhập đủ ${color.info[color.level].length} ký tự`}
                                maxLength={color.info[color.level].length}
                            />
                        </div>
                        <div>
                            <label>Mật khẩu:</label>
                            <input type="password"
                                required
                                name="password"
                                onChange={changePassword}
                                value={account.password}
                                maxLength={32}
                            />
                        </div>
                        <div>
                            <button id="login" onClick={(e) => { submitForm(e) }}>Login</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login;