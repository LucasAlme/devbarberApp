import React,{useState, useContext} from 'react'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import {UserContext} from '../../contexts/UserContext'


import {Container,
        InputArea, 
        CustomButtom,
        CustomButtomText,
        SignMessageButtom, 
        SignMessageButtomText,
        SignMessageButtomTextBold
}  from './styles'
import BarberLogo from '../../assets/barber.svg'
import SignInput from '../../components/SignInput'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'
import PersonIcon from '../../assets/person.svg'
import Api from '../../Api'


export default () => {

    const {dispatch: userDispatch} = useContext(UserContext)
    const [nameField,setNameField]  = useState('');
    const [emailField, setEmailField ] = useState('');
    const [passwordField, setPassowordField ] = useState('');

    const navigation = useNavigation();

    const handleSignClick = async()=>{
       if(nameField != '' && emailField != '' && passwordField != ''){
            let res = await Api.signUp(nameField, emailField, passwordField)

            if(res.token){
                await AsyncStorage.setItem('token', res.token)

                userDispatch({
                    type:'setAvatar',
                    payload:{
                        avatar: res.data.avatar
                    }
                })
                navigation.reset({
                    routes:[{name:'MainTab'}]
                })
            }else{
                alert('Erro: ' + res.error)
            }
       } else{
           alert ('Preencha os campos')
       }
        
    }
    const handleMessageButtomClick =()=>{
        navigation.reset({
            routes:[{name: 'SignIn'}]

        })

    }
    
    return(
        <Container> 
          <BarberLogo width="100%" height="140"/> 

          <InputArea>
            <SignInput  
                IconSvg={PersonIcon}
                placeholder="Digite seu nome"
                value={nameField}
                onChangeText={t=>setNameField(t)}
            />
            <SignInput  
                IconSvg={EmailIcon}
                placeholder="Digite seu e-mail"
                value={emailField}
                onChangeText={t=>setEmailField(t)}
            />
            <SignInput  
                IconSvg={LockIcon}
                placeholder="Digite sua senha" 
                value={passwordField}
                onChangeText={t=>setPassowordField(t)}
                password={true}
            />           
            <CustomButtom onPress={handleSignClick}>
                <CustomButtomText>Cadastrar</CustomButtomText>
            </CustomButtom>
          </InputArea>  
            <SignMessageButtom onPress={handleMessageButtomClick}>
                <SignMessageButtomText>Já possui uma conta?</SignMessageButtomText>
                <SignMessageButtomTextBold>Faça Login</SignMessageButtomTextBold>
            </SignMessageButtom>
        </Container>


    )


}