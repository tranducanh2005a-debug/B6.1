import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function SignIn() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  // Regex số điện thoại VN (10 số bắt đầu bằng 0)
  const validatePhone = (value) => {
    return /^0\d{9}$/.test(value);
  };

  // Format: 0934543444 -> 093 454 34 44
  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '');

    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);

    if (match) {
      return [match[1], match[2], match[3], match[4]]
        .filter(Boolean)
        .join(' ');
    }
    return cleaned;
  };

  const handleChange = (text) => {
    const formatted = formatPhone(text);
    setPhone(formatted);

    const raw = text.replace(/\D/g, '');

    // Không hiện lỗi khi chưa nhập gì
    if (raw.length === 0) {
      setError('');
      return;
    }

    if (raw.length < 10) {
      setError('Số điện thoại phải đủ 10 số');
    } else if (!validatePhone(raw)) {
      setError('Số điện thoại không đúng định dạng');
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
    const raw = phone.replace(/\D/g, '');

    if (!validatePhone(raw)) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
      return;
    }

    Alert.alert('Thành công', 'Đăng nhập thành công');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đăng nhập</Text>

      <View style={styles.content}>
        <Text style={styles.label}>Nhập số điện thoại</Text>

        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản
        </Text>

        <TextInput
          style={[
            styles.input,
            error ? styles.inputError : null,
          ]}
          placeholder="Nhập số điện thoại"
          keyboardType="numeric"
          value={phone}
          onChangeText={handleChange}
        />

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  content: {
    padding: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },

  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 8,
  },

  inputError: {
    borderBottomColor: 'red',
  },

  errorText: {
    color: 'red',
    marginTop: 6,
    fontSize: 13,
  },

  button: {
    backgroundColor: '#1A2CFF',
    padding: 14,
    borderRadius: 6,
    marginTop: 30,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});