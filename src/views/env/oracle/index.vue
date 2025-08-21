<script setup lang="tsx">
import { useBoolean } from '@sa/hooks';
import { fetchGetOracleList } from '@/service/api/env/oracle';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ButtonIcon from '@/components/custom/button-icon.vue';
import OracleOperateDrawer from './modules/oracle-operate-drawer.vue';
import OracleSearch from './modules/oracle-search.vue';

defineOptions({
  name: 'OracleList'
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
  apiFn: fetchGetOracleList,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    oracleId: null,
    name: null,
    runningStatus: null,
    version: null,
    performance: null,
    maxTablespace: null,
    maxIops: null,
    maxIomb: null,
    role: null,
    az: null,
    vpc: null,
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
      key: 'oracleId',
      title: 'oracle主键',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'name',
      title: '名称',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'runningStatus',
      title: '运行状态',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'version',
      title: '版本',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'performance',
      title: '配置',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'maxTablespace',
      title: '库空间限额(GB)',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'maxIops',
      title: '最大IOPS',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'maxIomb',
      title: '最大IOMB(MB)',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'role',
      title: '角色',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'az',
      title: '可用区',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'vpc',
      title: '网络',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'tenantAppId',
      title: '租户',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
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

function handleExport() {
  download('/env/oracle/export', searchParams, `oracle_${new Date().getTime()}.xlsx`);
}
function view(id: CommonType.IdType) {
  handleEdit('id', id);
}
const { bool: importVisible, setTrue: openImportModal } = useBoolean();

function handleImport() {
  // 导入逻辑
  openImportModal();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <OracleSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="oracle列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="false"
          :show-delete="false"
          :show-import="hasAuth('env:oracle:import')"
          :show-export="hasAuth('env:oracle:export')"
          @export="handleExport"
          @import="handleImport"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="1400"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <OpenImportModal v-model:visible="importVisible" @submitted="getData" />
      <OracleOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
