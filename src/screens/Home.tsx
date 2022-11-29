import React, {useCallback, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Product, Text} from '../components/';

const Home = () => {
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const {following, trending} = useData();
  const [products, setProducts] = useState(following);
  const [isLike, setIsLike] = useState(false);
  const {assets, colors, fonts, gradients, sizes, icons} = useTheme();

  const handleProducts = useCallback(
    (tab: number) => {
      setTab(tab);
      setProducts(tab === 0 ? following : trending);
    },
    [following, trending, setTab, setProducts],
  );

  return (
    <Block>
      {/* search input */}
      {/* <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input search placeholder={t('common.search')} />
      </Block> */}

      {/* toggle products list */}
      <Block
        row
        flex={0}
        align="center"
        justify="center"
        color={colors.card}
        paddingBottom={sizes.sm}>
        <Button onPress={() => handleProducts(0)}>
          <Block row align="center">
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 0 ? 'primary' : 'secondary']}>
              <Image
                source={assets.components}
                color={colors.white}
                radius={0}
              />
            </Block>
            <Text p font={fonts?.[tab === 0 ? 'medium' : 'normal']}>
              {t('home.timeline')}
            </Text>
          </Block>
        </Button>
        <Block
          gray
          flex={0}
          width={1}
          marginHorizontal={sizes.sm}
          height={sizes.socialIconSize}
        />
        <Button onPress={() => handleProducts(1)}>
          <Block row align="center">
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 1 ? 'primary' : 'secondary']}>
              <Image
                radius={0}
                color={colors.white}
                source={assets.documentation}
              />
            </Block>
            <Text p font={fonts?.[tab === 1 ? 'medium' : 'normal']}>
              {t('home.explore')}
            </Text>
          </Block>
        </Button>
      </Block>

      {/* products list */}
      <Block
        scroll
        paddingHorizontal={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block
          row
          white
          wrap="wrap"
          justify="space-between"
          marginTop={sizes.sm}>
        <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
            <Block marginBottom={sizes.xxl}>
              {/* user details */}
              <Block row marginLeft={sizes.xs} marginBottom={sizes.xs}>
                <Image
                  source={assets.avatar1}
                  style={{
                    width: sizes.xl,
                    height: sizes.xl,
                    borderRadius: sizes.s,
                  }}
                />
                <Block marginLeft={sizes.s}>
                  <Text p semibold>
                    Diego Marcano
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
                Viajar a sitios maravillosos y desconectarse, definitivamente el
                mejor plan de finde.
              </Text>
            </Block>
          </Block>
        </Block>
        <Block
          row
          white
          wrap="wrap"
          justify="space-between"
          marginTop={sizes.sm}>
        <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
            <Block marginBottom={sizes.xxl}>
              {/* user details */}
              <Block row marginLeft={sizes.xs} marginBottom={sizes.xs}>
                <Image
                  source={assets.avatar1}
                  style={{
                    width: sizes.xl,
                    height: sizes.xl,
                    borderRadius: sizes.s,
                  }}
                />
                <Block marginLeft={sizes.s}>
                  <Text p semibold>
                    Diego Marcano
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
                Viajar a sitios maravillosos y desconectarse, definitivamente el
                mejor plan de finde.
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Home;
