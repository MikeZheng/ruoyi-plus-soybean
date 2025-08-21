<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';

defineOptions({
  name: 'CvmOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Env.Cvm | null;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { options: envCvmRunningStatusOptions } = useDict('env_cvm_running_status');

const { restoreValidation } = useNaiveForm();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增cvm信息',
    edit: '查看cvm信息'
  };
  return titles[props.operateType];
});

type Model = Api.Env.CvmOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    cvmId: '',
    name: '',
    runningStatus: '',
    location: '',
    az: '',
    machineType: '',
    os: '',
    imageId: '',
    cpu: undefined,
    memory: undefined,
    bandWidth: undefined,
    ipv4MajorPublic: '',
    ipv4MajorPrivate: '',
    ipv6: '',
    sysDiskType: '',
    sysDisk: undefined,
    dataDisk0Type: '',
    dataDisk0: undefined,
    dataDisk1Type: '',
    dataDisk1: '',
    dataDisk2Type: '',
    dataDisk2: '',
    dataDisk3Type: '',
    dataDisk3: '',
    dataDisk4Type: '',
    dataDisk4: '',
    vpc: '',
    vpcSub: '',
    relaVpc: '',
    cvmCreateTime: '',
    feeMode: '',
    envTenantId: ''
  };
}

function handleUpdateModelWhenEdit() {
  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

watch(visible, () => {
  if (visible.value) {
    handleUpdateModelWhenEdit();
    restoreValidation();
  }
});

const fieldConfigs = [
  { label: 'cvm主键', key: 'cvmId', formatter: (value: any) => value || '-' },
  { label: '名称', key: 'name' },
  {
    label: '运行状态',
    key: 'runningStatus',
    formatter: (value: any) => envCvmRunningStatusOptions.value.find(opt => opt.value === value)?.label || '-'
  },
  { label: '地域', key: 'location' },
  { label: '可用区', key: 'az' },
  { label: '服务器类型', key: 'machineType' },
  { label: '操作系统', key: 'os' },
  { label: '镜像id', key: 'imageId' },
  { label: 'cpu核数', key: 'cpu' },
  { label: '内存G', key: 'memory' },
  { label: '带宽(Mbps)', key: 'bandWidth' },
  { label: '主IPv4公网IP', key: 'ipv4MajorPublic' },
  { label: '主IPv4内网IP', key: 'ipv4MajorPrivate' },
  { label: '主IPv6地址', key: 'ipv6' },
  { label: '系统盘类型', key: 'sysDiskType' },
  { label: '系统盘大小(GB)', key: 'sysDisk' },
  {
    label: `数据盘_0_类型`,
    key: `dataDisk0Type` as keyof Model
  },
  {
    label: `数据盘_0_大小(GB)`,
    key: `dataDisk0` as keyof Model
  },
  { label: '所属网络', key: 'vpc' },
  { label: '所在子网', key: 'vpcSub' },
  { label: '关联vpc', key: 'relaVpc' },
  { label: 'CVM创建时间', key: 'cvmCreateTime' },
  { label: '计费模式', key: 'feeMode' },
  { label: '租户', key: 'envTenantId' }
];

const diskFields = Array.from({ length: 4 }).flatMap((_, index) => [
  {
    label: `数据盘_${index + 1}_类型`,
    key: `dataDisk${index + 1}Type` as keyof Model
  },
  {
    label: `数据盘_${index + 1}_大小(GB)`,
    key: `dataDisk${index + 1}` as keyof Model
  }
]);

fieldConfigs.push(...diskFields);
</script>

<template>
  <NDrawer v-model:show="visible" :title="title" display-directive="show" :width="800" class="max-w-90%">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NGrid :cols="2" :x-gap="16" :y-gap="12" responsive="screen" class="pr-4">
        <NGi v-for="field in fieldConfigs" :key="field.key">
          <NFormItem :key="field.key" :label="field.label">
            <NText>
              {{
                field.formatter
                  ? field.formatter(model[field.key as keyof Model])
                  : model[field.key as keyof Model] || '-'
              }}
            </NText>
          </NFormItem>
        </NGi>
      </NGrid>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.return') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
