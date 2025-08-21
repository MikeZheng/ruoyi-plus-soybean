<script setup lang="tsx">
import { useBoolean } from '@sa/hooks';
import { fetchGetVpcList } from '@/service/api/env/vpc';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ButtonIcon from '@/components/custom/button-icon.vue';
import VpcOperateDrawer from './modules/vpc-operate-drawer.vue';
import VpcSearch from './modules/vpc-search.vue';

defineOptions({
  name: 'VpcList'
});

const appStore = useAppStore();
const { download } = useDownload();
const { hasAuth } = useAuth();

const { bool: importVisible, setTrue: openImportModal } = useBoolean();

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetVpcList,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    vpcId: null,
    name: null,
    ipv4Cidr: null,
    ipv6Cidr: null,
    subNetworkNum: null,
    routeTableNum: null,
    natGatewayNum: null,
    vpnGatewayNum: null,
    networkAclNum: null,
    peerConnectionNum: null,
    cvmNum: null,
    nakeMachineNum: null,
    specialGatewayNum: null,
    defaultPrivateNetwork: null,
    tenantAppId: null,
    status: null,
    params: {}
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'vpcId',
      title: 'vpc主键',
      align: 'center',
      width: 120
    },
    {
      key: 'name',
      title: '名称',
      align: 'center',
      width: 120
    },
    {
      key: 'ipv4Cidr',
      title: 'ipv4_cidr',
      align: 'center',
      width: 120
    },
    {
      key: 'ipv6Cidr',
      title: 'IPv6_cidr',
      align: 'center',
      width: 120
    },
    {
      key: 'subNetworkNum',
      title: '子网',
      align: 'center',
      width: 120
    },
    {
      key: 'routeTableNum',
      title: '路由表',
      align: 'center',
      width: 120
    },
    {
      key: 'natGatewayNum',
      title: 'NAT网关',
      align: 'center',
      width: 120
    },
    {
      key: 'vpnGatewayNum',
      title: 'VPN网关',
      align: 'center',
      width: 120
    },
    {
      key: 'networkAclNum',
      title: '网络ACL',
      align: 'center',
      width: 120
    },
    {
      key: 'peerConnectionNum',
      title: '对等连接',
      align: 'center',
      width: 120
    },
    {
      key: 'cvmNum',
      title: '云主机',
      align: 'center',
      width: 120
    },
    {
      key: 'nakeMachineNum',
      title: '裸金属服务',
      align: 'center',
      width: 120
    },
    {
      key: 'specialGatewayNum',
      title: '专线网关',
      align: 'center',
      width: 120
    },
    {
      key: 'defaultPrivateNetwork',
      title: '默认私有网络',
      align: 'center',
      width: 120
    },
    {
      key: 'tenantAppId',
      title: '租户',
      align: 'center',
      width: 120
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      fixed: 'right',
      render: row => {
        const viewBtn = () => {
          return (
            <ButtonIcon
              text
              type="primary"
              icon="material-symbols:preview"
              tooltipContent={$t('common.view')}
              onClick={() => view(row.id!)}
            />
          );
        };

        return <div class="flex-center gap-8px">{viewBtn()}</div>;
      }
    }
  ]
});

const { drawerVisible, operateType, editingData, handleEdit, checkedRowKeys } = useTableOperate(data, getData);

function view(id: CommonType.IdType) {
  handleEdit('id', id);
}

function handleExport() {
  download('/env/vpc/export', searchParams, `vpc_${new Date().getTime()}.xlsx`);
}

function handleImport() {
  // 导入逻辑
  openImportModal();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <VpcSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="vpc列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="false"
          :show-delete="false"
          :show-export="hasAuth('env:vpc:export')"
          :show-import="hasAuth('env:vpc:import')"
          @export="handleExport"
          @refresh="getData"
          @import="handleImport"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="2000"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <VpcImportModal v-model:visible="importVisible" @submitted="getData" />
      <VpcOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
