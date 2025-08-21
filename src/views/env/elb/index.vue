<script setup lang="tsx">
import { useBoolean } from '@sa/hooks';
import { fetchGetElbList } from '@/service/api/env/elb';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ButtonIcon from '@/components/custom/button-icon.vue';
import ElbOperateDrawer from './modules/elb-operate-drawer.vue';
import ElbSearch from './modules/elb-search.vue';
import ElbImportModal from './modules/elb-import-modal.vue';

defineOptions({
  name: 'ElbList'
});

const appStore = useAppStore();
const { download } = useDownload();
const { hasAuth } = useAuth();

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
  apiFn: fetchGetElbList,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    elbId: null,
    name: null,
    elbStatus: null,
    networkType: null,
    vpc: null,
    instanceLevel: null,
    hostname: null,
    elbCreateTime: null,
    publicNetBandwidth: null,
    ipAddress: null,
    tenantAppId: null,
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
      key: 'elbId',
      title: 'elb主键',
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
      key: 'ipAddress',
      title: 'IP地址',
      align: 'center',
      width: 120
    },
    {
      key: 'elbStatus',
      title: 'ELB状态',
      align: 'center',
      width: 120
    },
    {
      key: 'networkType',
      title: '网络类型',
      align: 'center',
      width: 120
    },
    {
      key: 'vpc',
      title: 'vpc',
      align: 'center',
      width: 120
    },
    {
      key: 'instanceLevel',
      title: '实例类型',
      align: 'center',
      width: 120
    },
    {
      key: 'hostname',
      title: '主机名',
      align: 'center',
      width: 120
    },
    {
      key: 'elbCreateTime',
      title: 'ELB创建时间',
      align: 'center',
      width: 120
    },
    {
      key: 'publicNetBandwidth',
      title: '带宽',
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
  download('/env/elb/export', searchParams, `elb信息_${new Date().getTime()}.xlsx`);
}
const { bool: importVisible, setTrue: openImportModal } = useBoolean();

function handleImport() {
  // 导入逻辑
  openImportModal();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <ElbSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="elb信息列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="false"
          :show-delete="false"
          :show-export="hasAuth('env:elb:export')"
          :show-import="hasAuth('env:elb:import')"
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
      <ElbImportModal v-model:visible="importVisible" @submitted="getData" />

      <ElbOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
