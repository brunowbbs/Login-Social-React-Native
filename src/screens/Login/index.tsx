import React from 'react'
import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';

export function Login() {

  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSigninWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível autenticar com a conta Google');
    }
  }

  async function handleSigninWithApple() {
    //Apple so entrega os dados do usuário na primeira vez da autenticação.
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível autenticar com a conta Apple');
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça login com um das contas abaixo</Text>
      <View style={styles.containerButtons}>
        <RectButton style={styles.button} onPress={handleSigninWithGoogle}>
          <Image source={require('../../assets/images/google.png')} style={styles.logo} />
          <View style={styles.containerTextButton}>
            <Text style={styles.textButton}>Entrar com Google</Text>
          </View>
        </RectButton>
        <RectButton style={styles.button} onPress={handleSigninWithApple}>
          <Image source={require('../../assets/images/apple.png')} style={styles.logo} />
          <View style={styles.containerTextButton}>
            <Text style={styles.textButton}>Entrar com Apple</Text>
          </View>
        </RectButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '300',
    fontSize: 25,
    color: '#575757',
    textAlign: 'center',
    marginBottom: 20
  },
  containerButtons: {

  },
  button: {
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    width: '100%',
    height: 57,
    backgroundColor: '#bdc3c7',
    marginBottom: 10,
    borderRadius: 5,
  },
  containerTextButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    marginLeft: '-10%',
    fontWeight: '300',
    fontSize: 16,
  },
  logo: {
    width: 35,
    height: 35,
  }
})
