# This script generates a JSON file with various values of Student's t-distribution.
# The results will be compared with the one's obtained with the JavaScript implementation.

dfs <- c(1, 2, 2.5, 5, 10, 10.1, 50, 50.1)
ts <- c(-10, -5, -2, -1, -0.5, 0, 0.5, 1, 2, 5, 10)
ps <- c(0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9)

pdfstr <- '  "pdf": [\n'
for (df in dfs) {
  for (t in ts) {
    pdfstr <- paste0(pdfstr, sprintf('    [%.2e, %.2e, %.16e],\n', t, df, dt(t, df)))
  }
}
pdfstr <- paste0(substring(pdfstr, 1, nchar(pdfstr) - 2), '  \n]')

cdfstr <- '  "cdf": [\n'
for (df in dfs) {
  for (t in ts) {
    cdfstr <- paste0(cdfstr, sprintf('    [%.2e, %.2e, %.16e],\n', t, df, pt(t, df)))
  }
}
cdfstr <- paste0(substring(cdfstr, 1, nchar(cdfstr) - 2), '  \n]')

ppfstr <- '  "ppf": [\n'
for (df in dfs) {
  for (p in ps) {
    ppfstr <- paste0(ppfstr, sprintf('    [%.2e, %.2e, %.16e],\n', p, df, qt(p, df)))
  }
}
ppfstr <- paste0(substring(ppfstr, 1, nchar(ppfstr) - 2), '  \n]')

write(paste0('{\n', pdfstr, ',\n', cdfstr, ',\n', ppfstr, '\n}\n'), file='assets/studentt.json')
