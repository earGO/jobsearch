import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { DynamicModuleLoader } from 'redux-dynamic-modules'
import { Helmet } from 'react-helmet'
import { Flex, Text } from '@ursip/design-system'

import Loading from '../common/Loading'
import ResizableSide from '../common/ResizableSide'
import CatalogList from './CatalogList'
import Catalog from './Catalog'
import CatalogForm from './CatalogForm'

import * as nsi from './module'
import * as selectors from './module/selectors'
import * as actions from './module/actions'

function SelectDictonary() {
  return (
    <Flex width="100%" style={{ height: '100%' }} alignItems="center" justifyContent="center">
      <Text align="center" fontSize={5} color="grey">
        выберите справочник <br /> из дерева слева
      </Text>
    </Flex>
  )
}

export default function() {
  const dispatch = useDispatch()
  const loading = useSelector(selectors.loading)
  const catalogsSideWidth = useSelector(selectors.catalogsSideWidth)
  const handleResize = (e, direction, ref, { width }) => dispatch(actions.setSideWidth(catalogsSideWidth + width))

  return (
    <DynamicModuleLoader modules={[nsi.default]}>
      <Helmet>
        <title>Нормативно-справочная информация</title>
      </Helmet>
      {loading ? (
        <Loading overlay>Загрузка справочников</Loading>
      ) : (
        <Flex style={{ height: '100%' }}>
          <ResizableSide
            size={{ width: catalogsSideWidth }}
            onResizeStop={handleResize}
            minWidth={150}
            maxWidth={600}
          >
            <Flex
              pt={2}
              flexDirection="column"
              alignItems="stretch"
              style={{ height: '100%', overflow: 'hidden' }}
            >
              <Route path={`${nsi.baseRoute}/:nick?`} component={CatalogList} />
            </Flex>
          </ResizableSide>
          <Flex flexDirection="column" alignItems="stretch" style={{ height: '100%' }} flex={1} pt={1} px={2}>
            <Switch>
              <Route exact path={`${nsi.baseRoute}`} component={SelectDictonary} />
              <Route exact path={`${nsi.baseRoute}/create`} component={CatalogForm} />
              <Route exact path={`${nsi.baseRoute}/:nick/edit`} component={CatalogForm} />
              <Route path={`${nsi.baseRoute}/:nick`} component={Catalog} />
            </Switch>
          </Flex>
        </Flex>
      )}
    </DynamicModuleLoader>
  )
}
