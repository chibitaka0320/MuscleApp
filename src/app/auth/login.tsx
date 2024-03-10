import { router, useNavigation } from 'expo-router'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { OblongButton } from '../../components/OblongButton'
import { useEffect } from 'react'

const signup = (): void => {
  router.replace('auth/signup')
}

const onMail = (): void => {
  router.push('auth/loginMail')
}

const Login = (): JSX.Element => {
  const nav = useNavigation()
  useEffect(() => {
    nav.setOptions({
      headerTitle: 'ログイン'
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.loginContents}>
        <OblongButton onPress={onMail}>
          メールアドレスでログイン
        </OblongButton>
        <OblongButton onPress={onMail}>
          Googleでログイン
        </OblongButton>
        <OblongButton onPress={onMail}>
          Facebookでログイン
        </OblongButton>
        <OblongButton onPress={onMail}>
          Appleでログイン
        </OblongButton>
        <View style={styles.signupTrans}>
          <View>
            <Text>アカウントをお持ちでない場合</Text>
          </View>
          <TouchableOpacity style={styles.signupLink} onPress={signup}>
            <Text style={styles.signupLinkText}>ご登録はこちら</Text>
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
  loginContents: {
    flex: 1,
    margin: 30
  },
  signupTrans: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  signupLink: {
    marginLeft: 10
  },
  signupLinkText: {
    fontWeight: 'bold'
  }
})

export default Login
