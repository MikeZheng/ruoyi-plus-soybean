<script setup lang="tsx">
import { useBoolean } from '@sa/hooks';
import { fetchGetCvmList } from '@/service/api/env/cvm';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ButtonIcon from '@/components/custom/button-icon.vue';
import CvmOperateDrawer from './modules/cvm-operate-drawer.vue';
import CvmSearch from './modules/cvm-search.vue';
import CvmImportModal from './modules/cvm-import-modal.vue';

const { bool: importVisible, setTrue: openImportModal } = useBoolean();

defineOptions({
  name: 'CvmList'
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
  apiFn: fetchGetCvmList,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    name: null,
    runningStatus: null,
    location: null,
    az: null,
    machineType: null,
    os: null,
    cpu: null,
    memory: null,
    ipv4MajorPrivate: null,
    vpc: null,
    vpcSub: null,
    relaVpc: null,
    envTenantId: null,
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
      key: 'name',
      title: '名称',
      align: 'center',
      width: 120
    },
    {
      key: 'ipv4MajorPrivate',
      title: '主IPv4内网IP',
      align: 'center',
      width: 120
    },
    {
      key: 'runningStatus',
      title: '运行状态',
      align: 'center',
      width: 120
    },
    {
      key: 'location',
      title: '地域',
      align: 'center',
      width: 120
    },
    {
      key: 'az',
      title: '可用区',
      align: 'center',
      width: 120
    },
    {
      key: 'machineType',
      title: '服务器类型',
      align: 'center',
      width: 120
    },
    {
      key: 'os',
      title: '操作系统',
      align: 'center',
      width: 120
    },
    {
      key: 'cpu',
      title: 'cpu核数',
      align: 'center',
      width: 120
    },
    {
      key: 'memory',
      title: '内存G',
      align: 'center',
      width: 120
    },
    {
      key: 'bandWidth',
      title: '带宽',
      align: 'center',
      width: 120
    },
    {
      key: 'vpc',
      title: '所属网络',
      align: 'center',
      width: 120
    },
    {
      key: 'vpcSub',
      title: '所在子网',
      align: 'center',
      width: 120
    },
    {
      key: 'relaVpc',
      title: '关联vpc',
      align: 'center',
      width: 150
    },
    {
      key: 'envTenantId',
      title: '租户',
      align: 'center',
      width: 120
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 100,
      fixed: 'right', // 新增固定列配置
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
  download('/env/cvm/export', searchParams, `cvm信息_${new Date().getTime()}.xlsx`);
}

function handleImport() {
  // 导入逻辑
  openImportModal();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <CvmSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="cvm信息列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :loading="loading"
          :show-delete="false"
          :show-export="hasAuth('env:cvm:export')"
          :show-import="hasAuth('env:cvm:import')"
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
        :scroll-x="2100"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="w-full sm:h-full"
      />
      <CvmImportModal v-model:visible="importVisible" @submitted="getData" />
      <CvmOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
