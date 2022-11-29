import React, {useCallback, useState} from 'react';
import {Platform, TouchableOpacity, Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';

const isAndroid = Platform.OS === 'android';

const Profile = () => {
  const {user} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes, gradients, icons} = useTheme();
  const [isLike, setIsLike] = useState(false);

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  const handleSocialLink = useCallback(
    (type: 'twitter' | 'dribbble') => {
      const url =
        type === 'twitter'
          ? `https://twitter.com/${user?.social?.twitter}`
          : `https://dribbble.com/${user?.social?.dribbble}`;

      try {
        //Linking.openURL(url);
      } catch (error) {
        alert(`Cannot open URL: ${url}`);
      }
    },
    [user],
  );

  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>
          <Block
            flex={0}
            gradient={gradients.primary}
            paddingBottom={sizes.l}
            paddingTop={sizes.m}
            radius={sizes.cardRadius}>
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
                marginLeft={sizes.s}
              />
              <Text p white marginLeft={sizes.s}>
                {t('profile.title')}
              </Text>
            </Button>
            <Block flex={0} align="center">
              <Image
                width={80}
                height={80}
                marginBottom={sizes.sm}
                source={{uri: user?.avatar}}
              />
              <Text h5 center white>
                {user?.name}
              </Text>
              <Block row marginVertical={sizes.m}>
                <Button
                  white
                  outlined
                  shadow={false}
                  radius={sizes.m}
                  onPress={() => {
                    alert(`Follow ${user?.name}`);
                  }}>
                  <Block
                    justify="center"
                    radius={sizes.m}
                    paddingHorizontal={sizes.m}
                    color="rgba(255,255,255,0.2)">
                    <Text white bold transform="uppercase">
                      {t('common.follow')}
                    </Text>
                  </Block>
                </Button>
                <Button
                  shadow={false}
                  radius={sizes.m}
                  marginHorizontal={sizes.sm}
                  color="rgba(255,255,255,0.2)"
                  outlined={String(colors.white)}
                  onPress={() => handleSocialLink('twitter')}>
                  <Ionicons
                    size={18}
                    name="logo-twitter"
                    color={colors.white}
                  />
                </Button>
                <Button
                  shadow={false}
                  radius={sizes.m}
                  color="rgba(255,255,255,0.2)"
                  outlined={String(colors.white)}
                  onPress={() => handleSocialLink('dribbble')}>
                  <Ionicons
                    size={18}
                    name="logo-dribbble"
                    color={colors.white}
                  />
                </Button>
              </Block>
            </Block>
          </Block>

          {/* profile: stats */}
          <Block
            flex={0}
            radius={sizes.sm}
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            marginTop={-sizes.l}
            marginHorizontal="8%"
            color="rgba(255,255,255,0.2)">
            <Block
              row
              blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="space-evenly"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid>
              <Block align="center">
                <Text h5>{user?.stats?.posts}</Text>
                <Text>{t('profile.posts')}</Text>
              </Block>
              <Block align="center">
                <Text h5>{(user?.stats?.followers || 0) / 1000}k</Text>
                <Text>{t('profile.followers')}</Text>
              </Block>
              <Block align="center">
                <Text h5>{(user?.stats?.following || 0) / 1000}k</Text>
                <Text>{t('profile.following')}</Text>
              </Block>
            </Block>
          </Block>

          {/* profile: about me */}
          <Block paddingHorizontal={sizes.sm}>
            <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
              {t('profile.aboutMe')}
            </Text>
            <Text p lineHeight={26}>
              {user?.about}
            </Text>
          </Block>

          {/* profile: posts */}
          <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
            <Text h5 semibold marginBottom={sizes.sm} marginTop={sizes.sm}>
              Publicaciones
            </Text>
            <Block marginBottom={sizes.xxl}>
              {/* user details */}
              <Block row marginLeft={sizes.xs} marginBottom={sizes.xs}>
                <Image
                  source={{uri: user?.avatar}}
                  style={{
                    width: sizes.xl,
                    height: sizes.xl,
                    borderRadius: sizes.s,
                  }}
                />
                <Block marginLeft={sizes.s}>
                  <Text p semibold>
                    {user?.name}
                  </Text>
                  <Text p gray>
                    Publicado el Nov 28 2022
                  </Text>
                </Block>
              </Block>
              <Image
                resizeMode="cover"
                source={assets.carousel1}
                style={{width: '100%'}}
              />
              <Block row flex={0} paddingTop={sizes.sm} paddingBottom={sizes.s}>
                <TouchableOpacity
                  style={{marginRight: sizes.sm}}
                  onPress={() => {
                    setIsLike(!isLike);
                  }}>
                  <Image
                    source={isLike ? icons.love_fill : icons.love}
                    radius={0}
                    color={isLike ? colors.danger : colors.icon}
                    width={28}
                    height={28}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginRight: sizes.sm}}
                  onPress={() => {
                    setIsLike(!isLike);
                  }}>
                  <Image
                    source={icons.star}
                    radius={0}
                    color={colors.icon}
                    width={22}
                    height={22}
                  />
                </TouchableOpacity>
              </Block>
              <Text p semibold>
                2 Me gusta
              </Text>
              <Text p lineHeight={26}>
                As Uber works through a huge amount of internal management turmoil,
                the company is also consolidating.
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
