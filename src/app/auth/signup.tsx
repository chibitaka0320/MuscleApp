import { router, useNavigation } from 'expo-router'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { OblongButton } from '../../components/OblongButton'
import { useEffect } from 'react'

const login = (): void => {
  router.replace('auth/login')
}

const Signup = (): JSX.Element => {
  const nav = useNavigation()
  useEffect(() => {
    nav.setOptions({
      headerTitle: '新規登録'
    })
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.signupContents}>
        <OblongButton>
          メールアドレスで登録
        </OblongButton>
        <OblongButton>
          Googleで登録
        </OblongButton>
        <OblongButton>
          Facebookで登録
        </OblongButton>
        <OblongButton>
          Appleで登録
        </OblongButton>
        <View style={styles.loginTrans}>
          <View>
            <Text>すでにアカウントをお持ちの場合</Text>
          </View>
          <TouchableOpacity style={styles.loginLink} onPress={login}>
            <Text style={styles.loginLinkText}>ログインはこちら</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  signupContents: {
    flex: 1,
    margin: 30
  },
  signupButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEDDDC',
    marginVertical: 15,
    width: '85%',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginTrans: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loginLink: {
    marginLeft: 10
  },
  loginLinkText: {
    fontWeight: 'bold'
  }
})

export default Signup
